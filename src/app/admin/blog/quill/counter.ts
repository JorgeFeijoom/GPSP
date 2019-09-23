import 'quill'

export interface Config {
  container: string
  unit: 'palabra' | 'caracteres'
}

export interface QuillInstance {
  on: any
  getText: any
}

export default class Counter {
  public quill: QuillInstance;
  public options: Config;

  constructor(quill: any, options: any) {
    this.quill = quill
    this.options = options

    setTimeout(() => {
      const container = document.querySelector(this.options.container);
  
      this.quill.on('text-change', () => {
        const length = this.calculate()
        container.innerHTML = length.words + ' palabras, ' + length.chars + ' caracteres';
      });
    }, 1000);
  }

  calculate() {
    const text = this.quill.getText().trim()

    return {
      words: !text ? 0 : text.split(/\s+/).length,
      chars: text.length
    };

  }
}