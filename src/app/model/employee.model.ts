import { Deserializable } from "./deserializable.model";
import { Material } from "./material.model";

export class Employee implements Deserializable {
    id: number;
    num: number;
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    validation: boolean;
    profilImage: string;
    materialAssigned: Material[];

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(id: number, num: number, firstname: string, lastname: string, email: string, age: number, validation: boolean, profilImage: string, materialAssigned: Material[]) {
        this.id = id;
        this.num = num;
        this.first_name = firstname;
        this.last_name = lastname;
        this.email = email;
        this.age = age;
        this.validation = validation;
        this.profilImage = profilImage;
        this.materialAssigned = materialAssigned;
    }
}