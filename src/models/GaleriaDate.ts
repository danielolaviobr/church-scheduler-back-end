import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("galeria_date")
export default class GaleriaDate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  date: string;

  @Column()
  selected: boolean;
}
