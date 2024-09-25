import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity()
export class Comentario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.comentarios,
    { eager: true }
  )
  usuario: Usuario;

  @Column('text')
  contenido: string;

  @ManyToOne(
    () => Publicacion,
    publicacion => publicacion.comentarios,
    {
      onDelete: 'CASCADE',
    }
  )
  publicacion: Publicacion;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion: Date;

}
