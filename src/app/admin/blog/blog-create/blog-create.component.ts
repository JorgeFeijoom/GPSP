import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import Quill from 'quill';
import Counter from '../quill/counter';
import { ImageDrop } from 'quill-image-drop-module';

import { BlogService } from '../blog.service';
import { AuthorCreateComponent } from '../author-create/author-create.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { AuthService } from '../../../auth/auth.service';
import { AuthorService } from '../author.service';
import { CategoryService } from '../category.service';
import { Category, Template, ExternalAuthor } from '../post';
import { TokenStorage } from '../../../auth/token.storage';
import { YoutubeService } from '../../youtube.service';
import { ConfirmValidParentMatcher, CustomErrorStateMatcher, imageValidator, videoValidator } from '../validators/validators';

Quill.register('modules/counter', Counter);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),
      transition(':leave', animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class BlogCreateComponent implements OnInit {

  user: any = {};

  //
  // Tools sidebar - Save/Preview/Cancel buttons
  //

  areToolsExpanded: boolean = true;

  //
  // YouTube
  //

  YouTubeValidUrl: boolean = false;

  //
  // Form vars
  //

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  customErrorStateMatcher = new CustomErrorStateMatcher();

  articleForm: FormGroup;
  articleFormSubmitted: boolean = false;

  filteredArticlesTemplate: Observable<Template[]>;
  filteredArticlesCategory: Observable<Category[]>;
  filteredArticlesExternalAuthor: Observable<ExternalAuthor[]>;

  articlesTemplates: Template[] = [
    { name: 'Noticia', value: 'news' },
    { name: 'Artículo', value: 'news' },
    { name: 'Entrevista', value: 'interview' },
    { name: 'Vídeo', value: 'video' },
    { name: 'Reportaje', value: 'article' },
    { name: 'Opinión', value: 'opinion' }
  ];

  //
  // Alerts
  //

  authorDeletionAlert = {
    title: '¿Estás seguro?',
    text: 'El autor será borrado y no estará disponible próximamente',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  };

  //
  // Categories
  //

  loadingCategories: boolean = false;
  createCategoryDialog: any = null;

  //
  // Authors
  //

  loadingAuthors: boolean = false;
  createAuthorDialog: any = null;

  //
  // Gallery
  //

  public isGalleryEnabled: boolean = false;

  //
  // Images uploaders
  //

  public headerUploader: FileUploader = new FileUploader({
    url: '/api/media/post/header',
    authToken: 'Bearer ' + this.token.getToken(),
    itemAlias: 'header'
  });
  public galleryUploader: FileUploader = new FileUploader({
    url: '/api/media/post/image',
    authToken: 'Bearer ' + this.token.getToken(), itemAlias: 'image'
  });

  public headerHasBaseDropZoneOver: boolean = false;
  public galleryHasBaseDropZoneOver: boolean = false;


  //
  // Content modules - Quill editor
  //

  contentModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'video', 'tweet']
    ],
    counter: { container: '#shortCounter' },
    imageDrop: true
  };


  constructor(private fb: FormBuilder,
              private blog: BlogService,
              private token: TokenStorage,
              private toastr: ToastrService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private author: AuthorService,
              private category: CategoryService,
              private auth: AuthService,
              private youtube: YoutubeService) { }

  ngOnInit() {

    /* INITIALIZING */

    //
    // Initializing article form
    //

    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      template: ['', [Validators.required]],
      header_mode: ['', [Validators.required]],
      interview_interviewee: [''],
      interview_occupation: [''],
      external_author: [''],
      external_author_aux: [''],
      image: this.fb.group({
        s: this.fb.group({
          url: ['']
        }),
        m: this.fb.group({
          url: ['']
        }),
        l: this.fb.group({
          url: ['']
        })
      }),
      video: this.fb.group({
        url: [''],
        embed: [''],
        frame: ['']
      }),
      author: ['', Validators.required],
      slug: ['', [Validators.required]],
      content: ['', [Validators.required]],
      gallery: this.fb.array([]),
      gallery_enabled: ['']
    }, { validator: Validators.compose([imageValidator, videoValidator]) });

    //
    // Getting user info
    //

    this.auth.me().subscribe((data) => {

      this.user = data.user;

      //
      // Assigning author to the article
      //

      this.articleForm.get('author').setValue(this.user._id);

    });

    //
    // Setting up header_mode as "image" by default
    //

    this.articleForm.get('header_mode').setValue('image');

    //
    // Filtering for articles type autocomplete
    //

    this.filteredArticlesTemplate = this.articleForm.get('template').valueChanges
      .pipe(
        startWith(''),
        map(template => template ? this._filterArticlesTemplate(template) : this.articlesTemplates.slice())
      );

    //
    // Filtering for articles category autocomplete
    //

    this.filteredArticlesCategory = this.articleForm.get('category').valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(category => {
          return this._filterArticlesCategory(category || '') || [];
        })
      );

    //
    // Filtering for articles external author autocomplete
    //

    this.filteredArticlesExternalAuthor = this.articleForm.get('external_author_aux').valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(external_author => {
          return this._filterArticlesExternalAuthor(external_author || '') || [];
        })
      );


    //
    // Listining for changes made on category and template
    // to update the Article obj.
    //
    // We call updateUrl() to update the URL with the new data
    //

    this.articleForm.get('title')
      .valueChanges
      .debounceTime(1000)
      .subscribe(title => {
        this.updateUrl(this.articleForm.value);
      });

    this.articleForm.get('template')
      .valueChanges
      .debounceTime(1000)
      .subscribe(template => {
        this.updateUrl(this.articleForm.value);
      });

    this.articleForm.get('category')
      .valueChanges
      .debounceTime(1000)
      .subscribe(category => {
        this.updateUrl(this.articleForm.value);
      });


    this.articleForm.get('external_author_aux')
      .valueChanges
      .debounceTime(500)
      .subscribe(external_author => {
        if ( typeof external_author === 'object' ) {
          this.loadingAuthors = false;
          this.articleForm.get('external_author').setValue(external_author);
        }
      });


    //
    // Listening for the header to finish to upload
    //

    this.headerUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let image = JSON.parse(response);
      this.articleForm.get('image').get('s').get('url').setValue(image.s.url);
      this.articleForm.get('image').get('m').get('url').setValue(image.m.url);
      this.articleForm.get('image').get('l').get('url').setValue(image.l.url);
      this.toastr.success('Cabecera subida correctamente', 'Cabecera');
    };


    //
    // Listening for the gallery images to finish to upload
    //

    this.galleryUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let image = JSON.parse(response);
      this.images.push(this.fb.control(image.image));
      this.toastr.success('Imagen subida correctamente', 'Galería');
    };


    //
    // Listening for a YouTube url
    //

    this.articleForm
      .get('video')
      .get('url')
      .valueChanges
      .debounceTime(1000)
      .subscribe(url => {
        this.checkVideoUrl(url);
      });

  }


  /**************************************
   *                                    *
   *           PUBLIC METHODS           *
   *                                    *
   * ************************************/

  /**
   * Getters
   */

  get title() { return this.articleForm.get('title'); }
  get interview_interviewee() { return this.articleForm.get('interview_interviewee'); }
  get interview_occupation() { return this.articleForm.get('interview_occupation'); }
  get images() { return this.articleForm.get('gallery') as FormArray; }


  /**
   * displayTemplateFn
   * For displaying the name in autocomplete input
   * 
   * @param template {Template}
   */

  displayTemplateFn (template: Template): String | undefined {
    return template ? template.name : undefined;
  }


  /**
   * displayCategoryFn - For displaying the category in autocomplete input
   * @param category {Category}
   */

  displayCategoryFn (category: Category): String | undefined {
    return category ? category.name : undefined;
  }


  /**
   * displayCategoryFn - For displaying the external author in autocomplete input
   * @param external_author {ExternalAuthor}
   */

  displayExternalAuthorFn (external_author: ExternalAuthor): String | undefined {
    return external_author ? external_author.name : undefined;
  }


  /**
   * updateUrl
   * Takes the Article obj and send it out to
   * backend to create the URL. This URL is created with
   * Category, Template and Title attributes.
   * 
   * @param article {Article}
   */

  updateUrl (article: FormGroup) {
    this
      .blog
      .createUrl(article)
      .subscribe(url => this.articleForm.get('slug').setValue(url));
  }

  /**
   * headerOverBase
   * It triggers when user tries to drag and drop an
   * image over the container. - Header version
   * 
   * @param event {any}
   */

  headerOverBase (event: any) {
    this.headerHasBaseDropZoneOver = event;
  }


  /**
   * galleryOverBase
   * It triggers when user tries to drag and drop an
   * image over the container. - Gallery version
   * 
   * @param event {any}
   */

  galleryOverBase (event: any) {
    this.galleryHasBaseDropZoneOver = event;
  }


  /**
   * headerDroppedOverBase
   * When the user drops the file over the drag
   * and drop zone. This event is triggered.
   * 
   * @param event {any}
   */

  headerDroppedOverBase (event: any) {
    if ( this.headerUploader.queue.length > 1 )
      this.headerUploader.queue.splice(0, 1);
  }


  /**
   * galleryDroppedOverBase
   * When the user drops the file over the drag
   * and drop gallery zone. This event is triggered.
   * 
   * @param event {any}
   */

  galleryDroppedOverBase (event: any) {
    console.log('Image added');
  }


  /**
   * checkVideoUrl
   * Checks the YouTube video url
   * and creates all the needed information
   * to create a useful embed.
   * 
   * @param video 
   */

  checkVideoUrl (video: string): void {

    if ( this.articleForm.get('header_mode').value === 'video' && video ) {

      //
      // Checking video is a valid URL
      //

      if ( !video.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm) ) {
        this.YouTubeValidUrl = false;
        this.toastr.error('La URL introducida no es una URL válida de YouTube', 'Vídeo');
        return;
      }
      else
        this.YouTubeValidUrl = true;

      //
      // Getting the proper embed URL from a regular YouTube URL
      //

      const embed = this.youtube.checkYouTubeUrl(video);

      //
      // Getting the proper frame from the YouTube video
      //

      this
        .youtube
        .getYouTubeFrame(video)
        .subscribe((data) => {

          let videoObj = {
            url: video,
            embed: embed,
            frame: data.frame
          };

          this.articleForm.get('video').get('embed').setValue(videoObj.embed);
          this.articleForm.get('video').get('frame').setValue(videoObj.frame);

          this.toastr.success('Vídeo añadido correctamente', 'Vídeo');

          /*
           * Uncomment just in case
           * the video must be saved in
           * database.
           *
          this
            .youtube
            .saveYouTubeVideo(videoObj)
            .subscribe((video) => {
              this.articleForm.get('video').get('embed').setValue(video.embed);
              this.articleForm.get('video').get('frame').setValue(video.frame);

              this.toastr.success('Vídeo añadido correctamente', 'Vídeo');
            });
           */

        });

    }

  }


  /**
   * openCreateAuthor
   * Deploys the dialog to create an
   * author.
   * 
   */

  openCreateAuthorDialog (external_author: ExternalAuthor): void {

    this.createAuthorDialog = this.dialog.open(AuthorCreateComponent, {
      width: '700px',
      data: {
        external_author: external_author || null,
        dialog: this.createAuthorDialog
      }
    });

    this.createAuthorDialog.afterClosed().subscribe((author: any) => {
      this.articleForm.get('external_author').reset(author);
    });
  }


  /**
   * openCreateAuthor
   * Deploys the dialog to create an
   * author.
   * 
   */

  openCreateCategoryDialog (): void {

    this.createCategoryDialog = this.dialog.open(CategoryCreateComponent, {
      width: '700px',
      data: { dialog: this.createCategoryDialog }
    });

    this.createCategoryDialog.afterClosed().subscribe((category: any) => {
      if ( category )
        this.articleForm.get('category').setValue(category);
    });
  }


  /**
   * deleteAuthor
   * Deletes from database the current
   * selected author.
   * 
   */

  deleteAuthor (): void {

    this
      .author
      .delete(this.articleForm.get('external_author').value._id)
      .subscribe(() => {
        console.log('success');
        this.articleForm.get('external_author_aux').setValue(null);
        this.articleForm.get('external_author').setValue('');
        this.toastr.success('El autor se ha borrado correctamente', 'Autor');
      },
      (error) => {
        console.log('error');
        this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
      });

  }


  /**
   * cleanUrl
   * Aux method for cleaning URLs
   * 
   * @param url {string} - The url to clean
   */

  cleanUrl (url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  /**
   * save
   * Saves the recently created article. Send it to backend.
   *
   */

  save(): void {
    console.log('PUM PUM!');
    console.log(this.articleForm);

    //
    // Validating
    //

    if ( this.articleForm.invalid ) {
      this.articleFormSubmitted = true;
      return;
    }

    //
    // Validation OK
    //

    let article = Object.assign({}, this.articleForm.value);

    article.category = article.category._id;
    article.template = article.template.value;
    
    if ( article.header_mode === 'image') article.video = null;
    else article.image = null;

    delete article.external_author_aux;
    delete article.gallery_enabled;

    console.log(article);

    this
      .blog
      .create(article)
      .subscribe((article) => {
        console.log(article);
      }, (error) => {
        console.log(error);
        this.toastr.error('Ha habido un error inesperado. Consulta con un administrador.', 'Error!');
      });
  }


  /**************************************
   *                                    *
   *           PRIVATE METHODS          *
   *                                    *
   * ************************************/

  /**
   * _filterArticlesTemplate
   * For filtering and matching input results in autocomplete
   * 
   * @param value {any}
   */
  
  private _filterArticlesTemplate(value: any): Template[] {

    let filterValue: any;

    if ( typeof value === 'string' )
      filterValue = value.toLowerCase();
    else
      filterValue = value.name.toLowerCase();

    return this.articlesTemplates.filter(template => template.name.toLowerCase().match(new RegExp(filterValue, 'gi')) !== null);
  }


  /**
   * _filterArticlesCategory
   * For filtering and matching input results in autocomplete
   * 
   * @param value {any}
   */

  private _filterArticlesCategory(value: any): Observable<Category[]> {

    let filterValue: any;

    if ( typeof value === 'string' )
      filterValue = value.toLowerCase();
    else
      filterValue = value.name.toLowerCase();

    this.loadingCategories = true;

    //
    // Filtering results
    //

    const params = { name: value };

    return this
      .category
      .getAll(params, 'no-loading-bar')
      .pipe(
        map((categories: any) => {

          console.log(categories);

          setTimeout(() => {
            this.loadingCategories = false;
          }, 1000);

          return categories.docs.filter(category => category.name.toLowerCase().match(new RegExp(filterValue, 'gi')) !== null);
        })
      );
  }


  /**
   * _filterArticlesExternalAuthor
   * For filtering and matching input results in autocomplete
   * 
   * @param value {any}
   */

  private _filterArticlesExternalAuthor(value: any): Observable<ExternalAuthor[]> {

    let filterValue: any;

    if ( typeof value === 'string' )
      filterValue = value.toLowerCase();
    else
      filterValue = value.name.toLowerCase();

    this.loadingAuthors = true;

    //
    // Filtering results
    //

    const params = { name: value };

    return this
      .author
      .getAll(params, 'no-loading-bar')
      .pipe(
        map((authors: ExternalAuthor[]) => {

          setTimeout(() => {
            this.loadingAuthors = false;
          }, 1000);

          return authors.filter(author => author.name.toLowerCase().match(new RegExp(filterValue, 'gi')) !== null);
        })
      );
  }

}



