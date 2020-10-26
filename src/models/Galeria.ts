import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("galeria")
export default class Galeria {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  scheduled_to: string;
}
