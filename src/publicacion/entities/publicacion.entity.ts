import { Comentario } from "src/comentario/entities/comentario.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publicacion {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    array: true,
    default: []
  })
  tipo_publicacion: string;

  @OneToMany(
    () => Comentario,
    comentario => comentario.publicacion,
    { eager: true }
  )
  comentarios: string[];

  @Column('text')
  contenido: string;

  @Column('text')
  descripcion: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion: Date;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.publicaciones
  )
  usuario: string;

}
