import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';
import {DatabaseProvider} from '../database/database';
import { Conta} from '../../class/conta';

/*
  Generated class for the ContasDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContasDaoProvider {

  constructor(public dbprovider: DatabaseProvider) {

  }


      public getList() {
      return this.dbProvider.getDB()
                            .then((db:SQLiteObject) => {
                              let sql = "SELECT * FROM CONTAS";

                              return db.executesql(sql, [])
                                                    .then((data:any) =>{
                                                      if (data.rows.length > 0) {
                                                        let contas: any[] = [];
                                                        for (var i=0; i < data.rows.lenght; i++){
                                                          contas.push(data.rows.item(i));
                                                        }
                                                        return contas;
                                                      } else {
                                                        return [];
                                                      }
                                                    })
                                                    .catch((e) => console.error("Erro", e));
                            })
                            .catch((e) => console.error("Erro ao consultar", e));
      }

      public get(id) {
        return this.dbProvider.getDB()
                      .then((db:SQLiteObject) => {
                      return db.executesql("SELECT * FROM CONTAS WHERE ID = ?", [id])
                      .then((data : any)  => {
                       if (data.rows.length > 0) {
                         let item = data.rows.item(0);
                         let conta - new Conta();
                         conta.ID = item.ID;
                         conta.DESCRICAO = item.DESCRICAO;
                         return conta;
                       }
                       return null;
                      })
                      .cacth(e => console.error(e));
                    })
                    .cacth(e => console.error(e));

      }
      public insert(conta) {
           return this.dbProvider.getDB()
                                 .then((db: SQLiteObject) => {
                                   return db.executesql("INSERT INTO CONTAS (DESCRICAO) VALUES (?)",[conta.DESCRICAO])
                                   .catch(e => console.error(e));
                                 })


                                 .catch(e => console.error(e));
      }
      public update(conta) {
return this.dbProvider.getDB()
                       .then((db: SQLiteObject) =>  {
                         return db.executesql("UPDATE CONTAS SET DESCRICAO = ? WHERE ID = ? ", [conta.DESCRICAO, conta.ID])
                         .cacth(e => console.log(e))
                       })
                       .catch(e => console.error(e));
      }
      public delete(id) {
  return this.dbProvider.getDB()
                        .then((db: SQLiteObject) => {
                          return db.executesql("DELETE FROM CONTAS WHERE ID = ?", [id])
                           .cacth(e => console.log(e))
                        })

                        .catch(e => console.error(e));
      }
}
