# importar librerias

from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin


# initializations
app = Flask(__name__)
CORS(app)


######CONEXION CON MYSQL###########
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'drogueria'
mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"

#########################  LOGIN   ######################################
@app.route('/LOGIN', methods=["POST"])
def LOGIN():
    usu = request.json.get("usuario", None)
    con = request.json.get("contraseña", None)
    cur = mysql.connection.cursor()
    cur.execute(
        'SELECT  usuario, Contraseña from usuario  where usuario = %s', (usu,))
    rv = cur.fetchall()
    cur.close()
    for result in rv:

        if usu == result[0] and con == result[1]:
            response = {"msg": "Access"}
            return response

        return {"msg": "Wrong email or password"}, 401



#########################  METODO INNER JOIN CONSULTAR VENTAS ######################################
@app.route('/listarventas', methods=['GET'])
def consultaventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT  c.Nombres, e.Dni, v.Serie, v.Numero, v.VentaTotal, v.SubTotal, v.Total, v.Fecha from ventas as v inner join cliente as c on v.idCliente = c.idCliente inner join empleado as e on v.idEmpleado = e.idEmpleado;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'Nombres': result[0], 'Dni': result[1], 'Serie': result[2],   'Numero': result[3], 'VentaTotal': result[4],
                       'SubTotal': result[5], 'Total': result[6], 'Fecha': result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})



#########################  METODO INNER JOIN CONSULTAR POR ID VENTAS ###################################
@app.route('/listarventas/<id>', methods=['GET'])
def parametro(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT  c.Nombres, e.Dni, v.Serie, v.Numero, v.VentaTotal, v.SubTotal, v.Total, v.Fecha from ventas as v inner join cliente as c on v.idCliente = c.idCliente inner join empleado as e on v.idEmpleado = e.idEmpleado WHERE Idventa = %s ', (id,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'Nombres': result[0], 'Dni': result[1], 'Serie': result[2],   'Numero': result[3], 'VentaTotal': result[4],
                       'SubTotal': result[5], 'Total': result[6], 'Fecha': result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


#########################  METODO ACTUALIZAR VENTAS ###############################################
@app.route('/actualizarventas/<id>', methods=['PUT'])
def updateventas(id):
    try:

        IdVenta = request.json['IdVenta']
        Serie = request.json['Serie']
        Numero = request.json['Numero']
        VentaTotal = request.json['VentaTotal']
        SubTotal = request.json['SubTotal']
        Total = request.json['Total']
        idCliente = request.json['idCliente']
        idEmpleado = request.json['idEmpleado']
        Fecha = request.json['Fecha']
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE ventas
        SET
            IdVenta = %s,
            Serie = %s,
            Numero = %s,
            VentaTotal = %s,
            SubTotal = %s,
            Total = %s,
            idCliente = %s,
            idEmpleado = %s,
            Fecha = %s

        WHERE IdVenta = %s
        """, ( id, Serie, Numero,VentaTotal,SubTotal,Total,idCliente,idEmpleado,Fecha, id))
        mysql.connection.commit()
        return jsonify({"informacion": "Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


        

####################################  METODO REGISTRAR VENTAS ###############################################
@app.route('/insertVenta', methods=['POST'])
def insertVenta():
    try:
        if request.method == 'POST':

            
            Serie = request.json['Serie']
            Numero = request.json['Numero']
            VentaTotal = request.json['VentaTotal']
            SubTotal = request.json['SubTotal']
            Total = request.json['Total']
            idCliente = request.json['idCliente']
            idEmpleado = request.json['idEmpleado']
            Fecha = request.json['Fecha']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO ventas (Serie,Numero,VentaTotal,SubTotal,Total,idCliente,idEmpleado,Fecha) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                        ( Serie, Numero, VentaTotal, SubTotal, Total, idCliente, idEmpleado, Fecha))
            mysql.connection.commit()
            return jsonify({"informacion": "Registro exitoso"})

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


#########################  METODO DELETE VENTAS ###############################################
@app.route('/deleteventas/<id>', methods=['DELETE'])
def deleteventas(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM ventas WHERE IdVenta = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion": "Registro eliminado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


#########################  METODO LEFT JOIN CONSULTAR VENTAS ######################################
@app.route('/consultaleftventas', methods=['GET'])
def consultaleftventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT  c.Nombres, e.Dni, v.Serie, v.Numero, v.VentaTotal, v.SubTotal, v.Total, v.Fecha from ventas as v left join cliente as c on v.idCliente = c.idCliente left join empleado as e on v.idEmpleado = e.idEmpleado;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'Nombres': result[0], 'Dni': result[1], 'Serie': result[2],   'Numero': result[3], 'VentaTotal': result[4],
                       'SubTotal': result[5], 'Total': result[6], 'Fecha': result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


#########################  METODO ORDER BY CONSULTAR VENTAS ######################################
@app.route('/consultaORDERBYventas', methods=['GET'])
def consultaORDERBYventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM ventas ORDER BY Fecha DESC')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'IdVenta': result[0],  'Serie': result[1],   'Numero': result[2], 'VentaTotal': result[3],
                       'SubTotal': result[4], 'Total': result[5],'idCliente': result[6],'idEmpleado': result[7], 'Fecha': result[8]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})



#########################  METODO AVG CONSULTAR VENTAS ######################################
@app.route('/consultaAVGventas', methods=['GET'])
def consultaAVGventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT AVG (Total) FROM ventas;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'avg_total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


#########################  METODO COUNT CONSULTAR VENTAS ######################################
@app.route('/consultaCOUNTventas', methods=['GET'])
def consultaCOUNTventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT count(IdVenta) FROM ventas;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'count': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


#########################  METODO MAX CONSULTAR VENTAS ######################################
@app.route('/consultaMAXventas', methods=['GET'])
def consultaMAXventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT MAX(Total) FROM ventas;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'max_total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})



#########################  METODO MIN CONSULTAR VENTAS ######################################
@app.route('/consultaMINventas', methods=['GET'])
def consultaMINventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT MIN(Total) FROM ventas;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'min_total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


#########################  METODO SUM CONSULTAR VENTAS ######################################
@app.route('/consultaSUMventas', methods=['GET'])
def consultaSUMventas():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT SUM(VentaTotal) FROM ventas;')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'sum_ventatotal': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


# validacion en caso de error
def pagina_no_encontrada(error):

    return "<h1>La pagina que intentas buscar no existe...</h1>"


# parametros a cargar
if __name__ == '__main__':

    app.register_error_handler(404, pagina_no_encontrada)

    app.run(debug=True)


