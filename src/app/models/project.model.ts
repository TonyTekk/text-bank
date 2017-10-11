export class ProjectModel {
    public id: string;
    public title: string;
    public color: string;

    public constructor(item: any) {
        item.id ? this.id = item.id : this.id = '';
        item.title ? this.title = item.title : this.title = 'default';
        item.color ? this.color = item.color : this.color = ProjectModel.generateColor();
    }

    private static generateColor(): string {
        return  `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.12)`;
    }
}
