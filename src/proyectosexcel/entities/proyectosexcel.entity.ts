// export class Proyectosexcel {}
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('proyectosexcel')
export class Proyectosexcel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  num: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  departamento: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  provincia: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  seccion: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  codigo_mun: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  codigo_sap: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  proyecto_nombre: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  municipio: string;

  @Column({ type: 'longtext', nullable: true })
  comunidades: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  latitud: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  longitud: string;

  @Column({ type: 'int', name: 'idTipo', nullable: true })
  idTipo: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  proyecto_tipo_H: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modalidad: string;

  @Column({ type: 'int', name: 'gestion_licitacion', nullable: true })
  gestion_licitacion: number;

  @Column({ type: 'int', name: 'gestion_licitacion2', nullable: true })
  gestion_licitacion2: number;

  @Column({ type: 'int', name: 'plan_plurianual', nullable: true })
  plan_plurianual: number;

  @Column({ type: 'int', name: 'uh_programado', nullable: true })
  uh_programado: number;

  @Column({ type: 'int', name: 'uh_techo', nullable: true })
  uh_techo: number;

  @Column({ type: 'int', name: 'uh_proy', nullable: true })
  uh_proy: number;

  @Column({ type: 'int', name: 'uh_ejecucion', nullable: true })
  uh_ejecucion: number;

  @Column({ type: 'int', name: 'grupo', nullable: true })
  grupo: number;

  @Column({ type: 'int', name: 'estado', nullable: true })
  estado: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  actividad: number;

  @Column({ type: 'int', name: 'gestion', nullable: true })
  gestion: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  estado_act: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  prioridad_tipo: string;

  @Column({ type: 'int', name: 'uh_subsidio', nullable: true })
  uh_subsidio: number;

  @Column({ type: 'int', name: 'uh_credito', nullable: true })
  uh_credito: number;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_subsidio: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_credito: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_cont_modificatorio: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  costo_proyecto: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_con_aev: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  por_con_benef: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_con_benef: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  por_con_mun_prop: number | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  estado_concurrencia: string;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  por_con_mun_ejectivo: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_con_muni: number | null;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  por_con_sectorial: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_con_sectorial: number | null;

  @Column({ type: 'double', precision: 10, scale: 2, nullable: true })
  por_con_dep: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_con_dep: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_total_concurrencia: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_sup_aev: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_fin_aev: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_total_proyecto: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fecha_contacto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fecha_entrega_form: string;

  @Column({ type: 'date', nullable: true })
  fecha_dev_lista_form: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_informe_social: Date | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  responsable_social: string;

  @Column({ type: 'date', nullable: true })
  fecha_socializacion: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_anteproyecto: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_recepcion_lista: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_proyecto: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_tdr: Date | null;

  @Column({ type: 'date', nullable: true })
  responsable_proyectos: Date | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nro_acta_comite: string;

  @Column({ type: 'date', nullable: true })
  fecha_acta_comite: Date | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  comite_planificacion: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  comite_fiscalizacion: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  comite_administrativo: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  certificacion_poa: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  certificacion_presupuestaria: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  cuce_proyecto: string;

  @Column({ type: 'date', nullable: true })
  inicio_lic1: Date | null;

  @Column({ type: 'date', nullable: true })
  fin_lic1: Date | null;

  @Column({ type: 'date', nullable: true })
  inicio_lic2: Date | null;

  @Column({ type: 'date', nullable: true })
  fin_lic2: Date | null;

  @Column({ type: 'date', nullable: true })
  inicio_lic3: Date | null;

  @Column({ type: 'date', nullable: true })
  fin_lic3: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_inv_excepcion: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_pres_propuesta: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_adj_empresa: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_pres_documentos: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo1: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo2: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo3: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo4: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo5: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo6: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo7: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ext_plazo8: Date | null;

  @Column({ type: 'date', nullable: true })
  firma_contrato_sicoes: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nro_res_adjudicaicon: string;

  @Column({ type: 'date', nullable: true })
  fecha_res_adjudicacion: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nro_contrato: string;

  @Column({ type: 'date', nullable: true })
  fecha_contrato: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  empresa_adjudicada: string;

  @Column({ type: 'date', nullable: true })
  fecha_sol_con_sup: Date | null;

  @Column({ type: 'varchar', length: 40, nullable: true })
  cuce_sup: string;

  @Column({ type: 'date', nullable: true })
  inicio_sup_lic1: Date | null;

  @Column({ type: 'date', nullable: true })
  fin_sup_lic1: Date | null;

  @Column({ type: 'date', nullable: true })
  inicio_sup_lic2: Date | null;

  @Column({ type: 'date', nullable: true })
  fin_sup_lic2: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_inv_con_sup: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_con_prop_sup: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_adjudicacion_sup: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_firma_contrato_sup: Date | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nro_res1_des_sup: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nro_res_adj_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_res_adj_sup: Date | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  nro_contrato_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_contrato_sup: Date | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_contrato_sup: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  ejecutado_planilla1_sup: number | null;

  @Column({ type: 'date', nullable: true })
  fecha_eje1_sup: Date | null;
  //
  @Column({ type: 'varchar', length: 50, nullable: true })
  informe_eje1_sup: string;
  @Column({ type: 'date', nullable: true })
  fecha_informe_eje1_sup: Date | null;
  //
  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  ejecutado_planilla2_sup: number | null;

  @Column({ type: 'date', nullable: true })
  fecha_eje2_sup: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  informe_eje2_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_informe_eje2_sup: Date | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  ejecutado_planilla3_sup: number | null;
  //
  @Column({ type: 'date', nullable: true })
  fecha_eje3_sup: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  informe_eje3_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_informe_eje3_sup: Date | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  ejecutado_planilla4_sup: number | null;
  //
  @Column({ type: 'date', nullable: true })
  fecha_eje4_sup: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  informe_eje4_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_informe_eje4_sup: Date | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  ejecutado_planilla5_sup: number | null;
  //
  @Column({ type: 'date', nullable: true })
  fecha_eje5_sup: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  informe_eje5_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_informe_eje5_sup: Date | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  ejecutado_planilla6_sup: number | null;
  //
  @Column({ type: 'date', nullable: true })
  fecha_eje6_sup: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  informe_eje6_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_informe_eje6_sup: Date | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  avance_financiero: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  empresa_sup: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_sup: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono_sup: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  direccion_sup: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  correo_sup: string;

  @Column({ type: 'date', nullable: true })
  fecha_orden_proceder: Date | null;

  @Column({ type: 'int', name: 'plazo_ejecucion', nullable: true })
  plazo_ejecucion: number;

  @Column({ type: 'int', name: 'retraso_dias', nullable: true })
  retraso_dias: number;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_provisional: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ent_prov: Date | null;

  @Column({ type: 'double', precision: 10, scale: 4, nullable: true })
  avance_fisico_obra: number | null;

  @Column({ type: 'double', precision: 10, scale: 4, nullable: true })
  avance_financiero_obra: number | null;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_planilla_anticipo: number | null;

  @Column({ type: 'date', nullable: true })
  fecha_anticipo: Date | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  informe_anticipo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pueblo_indigena: string;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  prog_mopsv: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linea_fisica2013: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linea_financiera2013: string;

  @Column({ type: 'date', nullable: true })
  prog_eval_beneficiario: Date | null;
  //ojo
  @Column({ type: 'date', nullable: true })
  reprog_eval_beneficiarios: Date | null;
  //ojo
  @Column({ type: 'date', nullable: true })
  prog_comite_aprobacion: Date | null;

  @Column({ type: 'date', nullable: true })
  prog_licitacion: Date | null;

  @Column({ type: 'date', nullable: true })
  prog_firma_contrato: Date | null;

  @Column({ type: 'date', nullable: true })
  prog_orden_proceder: Date | null;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_plazo_ejecucion: number;

  @Column({ type: 'date', nullable: true })
  prog_entrega_provisional: Date | null;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  tiempo_prev_entrega: number;

  @Column({ type: 'date', nullable: true })
  reprog_entrega_provisional: Date | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  alerta: string;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes3: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes4: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes5: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes6: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes7: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes8: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes9: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes10: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes11: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes12: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  total_entrega: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes2: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  prog_entrega_mes1: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  reprog_entrega_viviendas: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  estado2: string;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_definitiva: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ex_inicio1: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ex_fin1: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ex_inicio2: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ex_fin2: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ex_inicio3: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ex_fin3: Date | null;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  uh_entregado: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  uh_enejecucion: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  estado_entrega: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  fiscal: number;

  @Column({ type: 'int', name: 'actividad', nullable: true })
  ampliacion_plazo: number;

  @Column({ type: 'text', nullable: true })
  descripcion_obra: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'text', nullable: true })
  mapa: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  aniversario_municipal: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  monto_contrato_obra: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  concurrencia: string;

  @Column({ type: 'date', nullable: true })
  fecha_ini_social: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_fin_social: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ini_proyectos: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_fin_proyectos: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ini_comite: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_fin_comite: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_ini_contratacion: Date | null;

  @Column({ type: 'date', nullable: true })
  fecha_fin_contratacion: Date | null;

  @Column({ type: 'datetime', nullable: true })
  fecha_update: Date;

  @Column({ type: 'int', name: 'revisado', nullable: true })
  revisado: number;

  @Column({ type: 'int', name: 'activo', nullable: true })
  activo: number;

  @Column({ type: 'int', name: 'etapa', nullable: true })
  etapa: number;

  @Column({ type: 'int', name: 'etapa_fin', nullable: true })
  etapa_fin: number;

  @Column({ type: 'date', nullable: true })
  fecha_insert: Date | null;

  @Column({ type: 'int', name: 'social', nullable: true })
  social: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  reemplazado_por: string;

  @Column({ type: 'int', name: 'gestion_programada', nullable: true })
  gestion_programada: number;

  @Column({ type: 'varchar', length: 11, nullable: true })
  gestion_aprobacion: string;

  @Column({ type: 'date', nullable: true })
  fecha_prog_aprobacion: Date | null;

  @Column({ type: 'int', name: 'evaluacion_formulario', nullable: true })
  evaluacion_formulario: number;

  @Column({ type: 'int', name: 'uh_recorte', nullable: true })
  uh_recorte: number;

  @Column({ type: 'int', name: 'sigepro_id', nullable: true })
  sigepro_id: number;

  @Column({ type: 'int', name: 'id_cartera_sigepro', nullable: true })
  id_cartera_sigepro: number;

  @Column({ type: 'int', name: 'uh_inicial', nullable: true })
  uh_inicial: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: 'URBANO / RURAL',
  })
  area_intervencion: string | null;

  @Column({ type: 'int', name: 'resolucion_contrato', nullable: true })
  resolucion_contrato: number;

  @Column({ type: 'int', name: 'cierre_proyecto', nullable: true })
  cierre_proyecto: number;

  @Column({ type: 'int', name: 'servicio_complementario', nullable: true })
  servicio_complementario: number;

  @Column({ type: 'int', name: 'obra_complementaria', nullable: true })
  obra_complementaria: number;

  @Column({ type: 'int', name: 'cierre_mae', nullable: true })
  cierre_mae: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_cierre_mae: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cod_prov: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cod_muni: string;

  @Column({ type: 'int', name: 'normativa_cierre', nullable: true })
  normativa_cierre: number;

  // Definición de los índices
  /* @Index('PRIMARY', { unique: true })
  primaryId: number;

  @Index('id_num_departamento', ['id', 'num', 'departamento'])
  idNumDepartamentoIndex: [number, string | null, string | null];

  @Index('activo_fiscal', ['activo', 'fiscal'])
  activoFiscalIndex: [number | null, number | null];

  @Index('index_id_proy', ['id'])
  idIndexProy: number;

  @Index('index_id_estado', ['estado'])
  idEstadoIndex: number | null;

  @Index('index_id_actividad', ['actividad'])
  idActividadIndex: number | null;

  @Index('index_id_depto', ['departamento'])
  idDeptoIndex: string | null;

  @Index('index_id_modalidad', ['modalidad'])
  idModalidadIndex: string | null;

  @Index('index_id_tipo', ['idTipo'])
  idTipoIndex: number | null;

  @Index('index_id_costo', ['id'])
  idCostoIndex: number;

  @Index('index_id_viv_prog', ['id'])
  idVivProgIndex: number;

  @Index('index_id_acta', ['id'])
  idActaIndex: number;

  @Index('index_id_viv_ent', ['id'])
  idVivEntIndex: number;

  @Index('index_id_programacion', ['id'])
  idProgramacionIndex: number;

  @Index('index_id_cierre_proyecto', ['id'])
  idCierreProyectoIndex: number; */

  /*   @Column({ type: 'datetime', nullable: true })
  : Date;

  @Column({ type: 'double', precision: 22, scale: 2, nullable: true })
  : number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  : string;

  @Column({ type: 'date', nullable: true })
  : Date | null;

  @Column({ type: 'int', name: '', nullable: true })
  : number; */
}
