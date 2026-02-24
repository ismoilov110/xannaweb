import { api } from "../Api"

export const DeleteMe = async () => {
    // Backend delete kutsa shu
    return api.delete("/me/delete/", {
        data: {confirm: true}
    }) 

}