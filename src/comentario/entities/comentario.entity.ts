import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.comentarios
  )
  usuario: string;

  @Column('text')
  contenido: string;

  @ManyToOne(
    () => Publicacion,
    publicacion => publicacion.comentarios
  )
  publicacion: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion: Date;

}
