export class Menu {

  public top: Section[];
  public middle: Section[];
  public bottom: Section[];

  constructor () {

    this.top = [{
      url: '/profile',
      icon: 'face',
      name: 'Mi Perfil',
      pos: 'top'
    }];

    this.middle = [{
      url: '/subjects',
      icon: 'class',
      name: 'Mis Asignaturas',
      pos: 'middle'
    }, {
      url: '/matricularme',
      icon: 'queue',
      name: 'Matricularme',
      pos: 'middle'
    }];

    this.bottom = [];

  }

}

export interface Section {
  url: string,
  icon: string,
  name: string,
  pos: string
}