export class ArticleModel {
    public id: string;
    public apiId: string;
    public projectId: string;
    public title: string;
    public description: string;
    public text: string;

    public constructor(item: any) {
        item.id ? this.id = item.id : this.id = '';
        item.apiId ? this.apiId = item.apiId : this.apiId = this.id;

        if (item.apiId === '' && item.id !== '') {
            this.apiId = this.id;
        }

        item.projectId ? this.projectId = item.projectId : this.projectId = '';

        item.title ? this.title = item.title : this.title = '';
        item.description ? this.description = item.description : this.description = '';
        item.text ? this.text = item.text : this.text = '';
    }
}
