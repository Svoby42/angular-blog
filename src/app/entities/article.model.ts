export class Article{
    id: number | undefined;
    title: string = "";
    slug: string = "";
    content: string = "";
    create_time:Date = new Date;
    edit_time: Date | undefined;
    author_name: string = "";
    category_slug: string = "";
}