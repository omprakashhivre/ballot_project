

import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { Query } from "./Query";

@Entity({name:"option"})
export class Option extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    optionId:number |undefined

    // @Column()
    // queryId:number |undefined

    @Column({type:"varchar",name:"options"})
    options:string | undefined

    @ManyToOne(()=>Query,query=>query.options,{onDelete : "CASCADE",onUpdate:"CASCADE"})
    @JoinColumn({name:"queryId"})
    query : Query | undefined

    // @OneToMany(()=>Option,options => options.query)
    // options : Option | undefined

}