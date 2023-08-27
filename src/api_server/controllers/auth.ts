import { Request, Response } from 'express'
import { setStatus } from '@/lib/utils'
import { UserModel } from '@/api_server/models/user'
import { pbkdf2Sync, randomBytes } from 'crypto'

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Verificar si el usuario ya existe por su correo electrónico
    const existingUser = await UserModel.findOne({ email })
    if (existingUser != null) {
      res.status(409).json({ message: 'Conflict' })
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
    const newUser = new UserModel({ username, email, hashedPassword, salt })
    await newUser.save()

    res.status(201).json({ message: 'Created' })
  } catch (error) {
    console.error('Error en el registro:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Buscar el usuario por el correo electrónico
    const user = await UserModel.findOne({ email })
    if (user == null) {
      res.status(404).json({ message: 'Usuario no encontrado.' })
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
    if (hashedPassword !== user.password.toString('hex')) {
      res.status(401).json({ message: 'Credenciales incorrectas.' })
      return
    }

    res.status(200).json({ message: 'Successfull' })
  } catch (error) {
    console.error('Error en el inicio de sesión:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const signOut = (req: Request, res: Response): void => {
  res.status(200).json({ status: setStatus(req, 0, 'pong') })
}
