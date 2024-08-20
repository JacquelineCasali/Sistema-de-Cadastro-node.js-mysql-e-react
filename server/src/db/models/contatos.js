"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contatos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongsToMany n para n
      //CASCADE login deletado todos repositorios deletado
      //as nomeando o relacinamento eu escolho o nome do as 
      //through nome que vai relacionar loja com produtos (nome das tabelas com id)
      this.belongsToMany(models.Clientes,{
        foreignKey:'contatoId',
        through:'cliente_contatos',
           as:'login',
      onUpdate:'CASCADE',
      onDelete:'CASCADE'})
    }
  }
  Contatos.init(
    {
        name: {
        type: DataTypes.STRING,
        // unique:true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio",
          },
        },
      },
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
       isEmail:{
            msg:"Esse campo precisa ser um e-mail"
           }
        },
        // unique:true,
      },
  
      telefone: {
        type: DataTypes.STRING,
        // unique:true,
        allowNull: false,
        validate:{
          notEmpty:{
            msg:"Esse campo precissa ser um telefone valido"
          },
        }  
    },

    },

    {
      sequelize,
      modelName: "Contatos",
    }
  );

  return Contatos;
};
