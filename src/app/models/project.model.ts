export class ProjectModel {
    public id: string;
    public apiId: string;
    public name: string;
    public color: string;

    public constructor(item: any) {
        item.id ? this.id = item.id : this.id = '';
        item.apiId ? this.apiId = item.apiId : this.apiId = this.id;

        if (item.apiId === '' && item.id !== '') {
            this.apiId = this.id;
        }

        item.name ? this.name = item.name : this.name = 'Default Name';
        item.color ? this.color = item.color : this.color = ProjectModel.generateColor();
    }

    private static generateColor(): string {
        return  `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.12)`;
    }
}
