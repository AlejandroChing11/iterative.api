import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Comentario } from "src/comentario/entities/comentario.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { ContenidoMultimedia } from "./contenido-multimedia.entity";

@Entity()
export class Publicacion {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    default: 'imagen'
  })
  tipo_publicacion: string;

  @OneToMany(
    () => Comentario,
    comentario => comentario.publicacion,
    { eager: true, cascade: true }
  )
  comentarios: Comentario[];

  @OneToOne(
    () => ContenidoMultimedia,
    contenidoMultimedia => contenidoMultimedia.publicacion,
    {
      onDelete: 'CASCADE',
      cascade: true,
      eager: true,
    }
  )
  @JoinColumn()
  contenido_multimedia: ContenidoMultimedia;

  @Column('text')
  descripcion: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion: Date;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.publicaciones
  )
  usuario: Usuario;

}
