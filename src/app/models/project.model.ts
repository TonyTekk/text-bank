export class ProjectModel {
    public id: string;
    public title: string;

    public constructor(item: any) {
        item.id ? this.id = item.id : this.id = '';
        item.title ? this.title = item.title : this.title = 'default';
    }
}