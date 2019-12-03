export class Menu {

  public top: Section[];
  public middle: Section[];
  public bottom: Section[];

  constructor () {

    this.top = [{
      url: '/admin/profile',
      icon: 'face',
      name: 'Mi Perfil',
      pos: 'top'
    }];

    this.middle = [{
      url: '/admin/users',
      icon: 'personal',
      name: 'Usuarios',
      pos: 'middle'
    }, {
      url: '/admin/subjects',
      icon: 'book',
      name: 'Asignaturas',
      pos: 'middle'
    }];

    this.bottom = [];

  }

}

export interface Section {
  url: string;
  icon: string;
  name: string;
  pos: string;
}
