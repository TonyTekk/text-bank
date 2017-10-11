export class ArticleModel {
    public id: string;
    public projectId: string;
    public title: string;
    public description: string;
    public text: string;

    public constructor(item: any) {
        item.id ? this.id = item.id : this.id = '';
        item.progectId ? this.projectId = item.progectId : this.projectId = '';

        item.title ? this.title = item.title : this.title = '';
        item.description ? this.description = item.description : this.description = '';
        item.text ? this.text = item.text : this.text = '';
    }
}
