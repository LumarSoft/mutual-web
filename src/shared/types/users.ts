// One entry per Excel row of the bono: a bono that won N times has N rows
export interface Premio {
  fec_gan: string;
  pre_pen: string;
}

export interface User {
  apellido:  string;
  documento: string;
  cliente:   string;
  entidad:   string;
  codigo:    string;
  fec_mae:   string;
  cuopag:    string;
  cuopen:    string;
  ult_cob:   string;
  fupdate:   string;
  fupd:      string;
  ganador:   string;
  fec_gan:   string;
  pre_pen:   string;
  premios:   Premio[];
}
