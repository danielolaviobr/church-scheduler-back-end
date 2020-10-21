import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("celula")
export default class Celula {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  scheduled_to: string;
}
