export class AggregateRoot {
    public data: Datum[];
}

export class Datum {
    public year: number;
    public circle1: Circle;
    public circle2: Circle;
    public categories: Category[];
}

export class Unit {
    public value: number;
    public maxValue: number;
}

export class Circle extends Unit { }

export class Category extends Unit {
    public title: string;
}