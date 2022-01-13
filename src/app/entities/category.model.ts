import { Article } from "./article.model";

export class Category{
    id: number | undefined;
    title: string = "";
    description: string = "";
    slug: string = "";
    create_time: Date = new Date;
    article_list: Array<Article> = [];
}