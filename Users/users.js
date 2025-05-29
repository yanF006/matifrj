
const knex = require('../database/database')
var bcrypt = require('bcryptjs')

class User {

//CRIAÇÃO, EDIÇÃO E DELEÇÃO
    //Criar um usuário novo
    async new(email, password, name,cpf,turma){
            var hash = await bcrypt.hash(password,10)
          
            await knex.insert({email, password:hash, name, role:0,cpf,turma}).table('users')

    }


    //Editar um usuário já existente
    async update(id,name,turma){
        var user = await this.findByID(id)

        if(user !=undefined){
            var editUser ={}
            

            if(name!=undefined){
                editUser.name = name
            }

            if(turma!=undefined){
                editUser.turma = turma
            }

            try{
                await knex.update(editUser).where({id:id}).table("users")
                return{status: true}

            }catch(err){
                return{status: false, err: err}
            }

        }else{
            return {status:false, err:"Usuario não existe"}
        }
    }

    async delete(id){
        var user = await this.findByID(id)
        if (user!=undefined){
            try{
                await knex.delete().where({id:id}).table('users')
                return {status: true}

            }catch(err){
                return{status:false, err: err}

            }
        }else{
            return{status: false, err: "Usuario não existe, não pode ser apagado"}
        }

    }

    

//BUSCA    
    //Listar todos os usuários
    async findAll(){
        var result = await knex.select(['id','name', 'email', 'role','cpf']).table('users');
        return result;
    }

    async findAlmostAll(name){
        var result = await knex.select(['id','name', 'email', 'role','cpf']).whereNot('name',name).table('users');
        return result;
    }


    //Achar usuário pelo ID
    async findByID(id){
        var result = await knex.select(['id','name', 'email', 'role','cpf', 'turma']).where({id:id}).table('users');
        return result
    }

    async findByEmail(email){
        var result = await knex.select(['id','name','password', 'email', 'role','cpf', 'turma']).where({email:email}).table('users');
        console.log(result[0])
        if (result.length>0){
            return result[0]
        }else{
            return undefined
        }
    }

    //Achar usuário pelo Email
    async findEmail(email){
        var result = await knex.select('*').from('users').where({email:email})
        if (result.length>0){
            return true
        }else{
            return false
        }
    }

    async findByName(query){
        var resultado = await knex('users')
        .select('name', 'role','id')
        .where('name', 'like', `%${query}%`);
        return resultado;
    }

    async findByRole(role){
    var result = await knex.select('*').from('users').where({role:role})
    return result
    }

    async mudarRole(id,role){
        await knex.update({role:role}).where({id:id}).table('users')
    }

    

    
}

module.exports = new User();

