export interface ArticleView extends ArticleForm {
    id: number;
}

export interface ArticleForm {
    name: string;
    amount: number;
}

export interface ArticleSearchModel{
    q: string;
}