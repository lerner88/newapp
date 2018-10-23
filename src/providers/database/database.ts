import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public sqlite: SQLite) {}

/**
* funçao tem o objetivo de criar ou abrir um banco de dados SQLite
*/
    getDB(){
  return this.sqlite.create({
    name: 'lp4-finance',
    location: 'default'
  });

}
/**
* Cria a estrutur inicial do banco de dados
*/
createDataBase(){
return this.getDB()
           .then((db:SQLiteObject) => {
             //criar minhas tabelas
             this.createTables(db);
             //insert dos dados iniciais
             this.insertdefault(db);
           })
           .catch();

}
/**
* cria as tabelas padroes do AppModule*/
private createTables(db: SQLiteObject){
  db.sqlBatch([
    ['CREATE TABLE IF NOT EXISTS CONTAS(ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO TEXT)']

  ])
    .then(() => console.log("Tabelas criadas com sucesso!"))
    .catch((e) => console.error("Erro ao criar as tabelas", e));
  }
/**
*Insert registro padroes*/
  private insertdefault(db: SQLiteObject){
    db.executesql('SELECT COUNT(ID) AS QNTD FROM CONTAS', <any>{})
              .then((data: any) =>{
               if (data.rows.item(0).QNTD ==0){
                 //inserir CONTAS
                 db.sqlBatch([
                 ['INSERT INTO CONTAS (DESCRICAO) VALUE (?)',['Alimentacao']],
                  ['INSERT INTO CONTAS (DESCRICAO) VALUE (?)',['Saude']],
                   ['INSERT INTO CONTAS (DESCRICAO) VALUE (?)',['Transporte']]
               ])
                     .then(() => console.log("Insert de contas realizado com sucesso"))
                     .catch((e) => console.error("Erro ao inserir contas padrao", e))
               }
             })
             .catch((e) => console.error("Erro ao consultar contas", e));
  }
}
