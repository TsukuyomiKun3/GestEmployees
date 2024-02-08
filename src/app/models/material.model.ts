import { Deserializable } from "./deserializable.model";

export class Material implements Deserializable {
    id: number;
    ref: string;
    state: string;
    name: string;
    image: boolean;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(id: number, ref: string, state: string, name: string, image: boolean) {
        this.id = id;
        this.ref = ref;
        this.state = state;
        this.name = name;
        this.image = image;
    }
}
