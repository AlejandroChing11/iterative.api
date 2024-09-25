import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Publicacion } from "./publicacion.entity";

@Entity({ name: 'contenido_multimedia' })
export class ContenidoMultimedia {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url: string;

  @OneToOne(
    () => Publicacion,
    publicacion => publicacion.contenido_multimedia,
    {
      onDelete: 'CASCADE',
    }
  )
  publicacion: Publicacion;

}
