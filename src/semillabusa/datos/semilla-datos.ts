export const SEMILLA_DEPARTAMENTOS = [
  {
    departamento: 'La Paz',
  },
  {
    departamento: 'Beni',
  },
  {
    departamento: 'Cochabamba',
  },
  {
    departamento: 'Chuquisaca',
  },
  {
    departamento: 'Oruro',
  },
  {
    departamento: 'Pando',
  },
  {
    departamento: 'Potosí',
  },
  {
    departamento: 'Tarija',
  },
  {
    departamento: 'Santa Cruz',
  },
];
export const SEMILLA_SUCURSAL = [
  {
    sucursal: 'Agencia Central: Av. Camacho N° 1470, Esq. Bueno.',
    departamento_id: 1,
  },
  {
    sucursal:
      'Agencia El Prado: Av. 16 de Julio N° 1660, Edif. Ex - Banco Central de Bolivia.',
    departamento_id: 1,
  },
  {
    sucursal: 'Agencia San Pedro: Av. Busch N° 1325, Esq. C. 21 Calacoto.',
    departamento_id: 1,
  },
  {
    sucursal: 'Agencia Miraflores: Av. Arce N° 2735, Edif. Multicentro.',
    departamento_id: 1,
  },
  {
    sucursal: 'Agencia Sopocachi: Av. Ecuador N° 2555, Edif. Torre Azul.',
    departamento_id: 1,
  },
  {
    sucursal:
      'Agencia Obrajes: Av. Hernando Siles N° 6445, Esq. C. 13 Obrajes.',
    departamento_id: 1,
  },
  {
    sucursal:
      'Agencia Villa Fátima: Av. Buenos Aires N° 855, Edif. Mutual La Primera.',
    departamento_id: 1,
  },
  {
    sucursal: 'Agencia El Alto: Av. 6 de Marzo N° 1240, Zona Villa Dolores.',
    departamento_id: 1,
  },
  {
    sucursal:
      'Agencia Ciudad Satélite: Av. Satélite N° 3450, Edif. Multicentro Norte.',
    departamento_id: 1,
  },
  {
    sucursal: 'Agencia Central: C. Baptista N° 454, Esq. Esteban Arce.',
    departamento_id: 3,
  },
  {
    sucursal: 'Agencia Cala Cala: Av. América N° 724, Esq. C. Aniceto Arce.',
    departamento_id: 3,
  },
  {
    sucursal:
      'Agencia Quillacollo: Av. Blanco Galindo N° Km 4 1/2, Esq. Av. Capitán Ustáriz.',
    departamento_id: 3,
  },
  {
    sucursal: 'Agencia Sacaba: Av. Circunvalación N° 200, Esq. Av. Petrolera.',
    departamento_id: 3,
  },
  {
    sucursal: 'Agencia Tiquipaya: Av. Ecológica N° 1000, Esq. C. 17 de Agosto.',
    departamento_id: 3,
  },
  {
    sucursal: 'Agencia Vinto: C. 16 de Julio N° S/N, Esq. Av. Ferrocarril.',
    departamento_id: 3,
  },
  {
    sucursal:
      'Agencia Central: Av. 24 de Septiembre N° 333, Esq. C. Suárez Arana.',
    departamento_id: 9,
  },
  {
    sucursal: 'Agencia Equipetrol: Av. San Martín N° 3500, Edif. Las Brisas.',
    departamento_id: 9,
  },
  {
    sucursal: 'Agencia Beni: Av. Beni N° 450, Esq. C. Pando.',
    departamento_id: 9,
  },
  {
    sucursal: 'Agencia Warnes: Av. Warnes N° 100, Esq. C. 4 de Noviembre.',
    departamento_id: 9,
  },
  {
    sucursal: 'Agencia Montero: C. Ichilo N° 350, Esq. C. Warnes.',
    departamento_id: 9,
  },
  {
    sucursal: 'Agencia La Guardia: Av. Virgen de Luján N° 200, Esq. C. 8.',
    departamento_id: 9,
  },
  {
    sucursal: 'Oruro: C. Adolfo Mier N° 601, Esq. C. La Plata.',
    departamento_id: 5,
  },
  {
    sucursal: 'Potosí: C. Cobija N° 85, Esq. C. Quijarro.',
    departamento_id: 7,
  },
  {
    sucursal: 'Sucre: C. Bolívar N° 645, Esq. C. Destacamento.',
    departamento_id: 4,
  },
  {
    sucursal: 'Tarija: C. General Trigo N° 485, Esq. C. Daniel Campos.',
    departamento_id: 8,
  },
  {
    sucursal: 'Cobija: Av. 9 de Febrero N° 450, Esq. C. Beni.',
    departamento_id: 6,
  },
  {
    sucursal: 'Trinidad: Av. Beni N° 250, Esq. C. Tarija.',
    departamento_id: 2,
  },
  /* {
    sucursal: '',
  },
  {
    sucursal: '',
  }, */
];
export const SEMILLA_NIVELES = [
  {
    nivel: 'ADMINISTRADOR',
  },
  {
    nivel: 'SUBADMINISTRADOR',
  },
  {
    nivel: 'AGENTE',
  },
];
export const SEMILLA_USUARIOS = [
  {
    nombres: 'ADMIN',
    apellidos: 'ADMIN',
    ci: 'ADMINBUSAAEV',
    complemento: null,
    correo: 'admin@admin.aev.bo.go',
    contrasenia: 'ADMINBUSAAEV',
    es_activo: true,
    se_cambiado_cntr: true,
    nivelbusa_id: 1,
    sucursal_id: 5,
  },
  {
    nombres: 'ADMINLPZ',
    apellidos: 'ADMINLPZ',
    ci: 'ADMINBUSALPZ',
    complemento: null,
    correo: 'adminlpz@adminlpz.busa.bo.go',
    contrasenia: 'ADMINBUSALPZ',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 1,
  },
  {
    nombres: 'ADMINCBBA',
    apellidos: 'ADMINCBBA',
    ci: 'ADMINBUSACBBA',
    complemento: null,
    correo: 'admincbba@admincbba.busa.bo.go',
    contrasenia: 'ADMINBUSACBBA',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 10,
  },
  {
    nombres: 'ADMINSCZ',
    apellidos: 'ADMINSCZ',
    ci: 'ADMINBUSASCZ',
    complemento: null,
    correo: 'adminscz@adminscz.busa.bo.go',
    contrasenia: 'ADMINBUSASCZ',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 16,
  },
  {
    nombres: 'ADMINORU',
    apellidos: 'ADMINORU',
    ci: 'ADMINBUSAORU',
    complemento: null,
    correo: 'adminoru@adminoru.busa.bo.go',
    contrasenia: 'ADMINBUSAORU',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 22,
  },
  {
    nombres: 'ADMINPSI',
    apellidos: 'ADMINPSI',
    ci: 'ADMINBUSAPSI',
    complemento: null,
    correo: 'adminpsi@adminpsi.busa.bo.go',
    contrasenia: 'ADMINBUSAPSI',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 23,
  },
  {
    nombres: 'ADMINCHQ',
    apellidos: 'ADMINCHQ',
    ci: 'ADMINBUSACHQ',
    complemento: null,
    correo: 'adminchq@adminchq.busa.bo.go',
    contrasenia: 'ADMINBUSACHQ',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 24,
  },
  {
    nombres: 'ADMINTJA',
    apellidos: 'ADMINTJA',
    ci: 'ADMINBUSATJA',
    complemento: null,
    correo: 'admintja@admintja.busa.bo.go',
    contrasenia: 'ADMINBUSATJA',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 25,
  },
  {
    nombres: 'ADMINPND',
    apellidos: 'ADMINPND',
    ci: 'ADMINBUSAPND',
    complemento: null,
    correo: 'adminpnd@adminpnd.busa.bo.go',
    contrasenia: 'ADMINBUSAPND',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 26,
  },
  {
    nombres: 'ADMINBNI',
    apellidos: 'ADMINBNI',
    ci: 'ADMINBUSABNI',
    complemento: null,
    correo: 'adminbni@adminbni.busa.bo.go',
    contrasenia: 'ADMINBUSABNI',
    es_activo: true,
    se_cambiado_cntr: false,
    nivelbusa_id: 2,
    sucursal_id: 27,
  },
];
