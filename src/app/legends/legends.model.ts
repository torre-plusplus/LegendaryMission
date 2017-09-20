export class Legend {
  public title: string;
  public id: string;
  public username: string;
  public date: number;
  public imagePath: string;
  public story: string;
  public stars: number;

  constructor (title: string, id: string, username: string, imagePath: string, story: string, date: number, stars: number){
    //Add Location Data!
    
    this.title = title;
    this.id = id;
    this.username = username;
    this.imagePath = imagePath;
    this.story = story;
    this.date = date;
    this.stars = stars;

  }
}

