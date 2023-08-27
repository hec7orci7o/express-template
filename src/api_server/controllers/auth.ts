import { Request, Response } from 'express'
import { setStatus } from '@/lib/utils'
import { UserModel } from '@/api_server/models/user'
import { pbkdf2Sync, randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'

interface tmpUser {
  id: string
  email: string
  username: string
}

function createToken(user: tmpUser): string | jwt.JwtPayload {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: '1h'
    }
  )
}

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Verificar si el usuario ya existe por su correo electrónico
    const existingUser = await UserModel.findOne({ email })
    if (existingUser != null) {
      res.status(409).json({ status: setStatus(req, 409, 'Conflict') })
      return
    }

    // Crear un nuevo usuario
    const salt = randomBytes(32).toString('hex')
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      10000,
      64,
      'sha512'
    ).toString('hex')

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      salt
    })

    res.status(201).json({
      data: {
        id: newUser.id,
        username,
        email
      },
      status: setStatus(req, 201, 'Internal Server Error')
    })
  } catch (error) {
    res
      .status(500)
      .json({ status: setStatus(req, 500, 'Internal Server Error') })
  }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Buscar el usuario por el correo electrónico
    const user = await UserModel.findOne({ email })
    if (user == null) {
      res.status(404).json({ status: setStatus(req, 404, 'Not Found') })
      return
    }

    // Crear un hash de la contraseña proporcionada durante el inicio de sesión
    const hashedPassword = pbkdf2Sync(
      password,
      user.salt,
      10000,
      64,
      'sha512'
    ).toString('hex')

    // Comparar el hash generado con el hash almacenado en la base de datos
    if (hashedPassword !== String(user.password)) {
      res.status(401).json({ status: setStatus(req, 401, 'Unathorized') })
      return
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      username: user.username
    })

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        token
      },
      status: setStatus(req, 200, 'Internal Server Error')
    })
  } catch (error) {
    res
      .status(500)
      .json({ status: setStatus(req, 500, 'Internal Server Error') })
  }
}
