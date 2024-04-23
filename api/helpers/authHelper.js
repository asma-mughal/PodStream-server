
import bcrypt from "bcrypt";
export const hashPasswordUser = async (password) => {
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword;
    } catch (err)
    {
        console.log(err)
    }
}
export const comparePasswordUser = async (password, hashedPassword) => {
    return bcrypt.compare(password,hashedPassword)
}