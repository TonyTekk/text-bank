export class ArticleModel {
    public id: string;
    public projectId: string;
    public title: string;
    public description: string;
    public text: string;

    public constructor(article) {
        article.id ? this.id = article.id : this.id = '';
        article.progectId ? this.projectId = article.progectId : this.projectId = '';

        article.title ? this.title = article.title : this.title = '';
        article.description ? this.description = article.description : this.description = '';
        article.text ? this.text = article.text : this.text = '';
    }
}
