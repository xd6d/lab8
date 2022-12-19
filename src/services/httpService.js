import request from "axios";
const link ="https://localhost:8080/"
//TODO convert errors to ua
export async function getAll(entity, page=0, elementsPerPage=10, sortDirection, sortField){
    try{
        return await request.get(link+entity, {params:
                {page:page,elementsPerPage:elementsPerPage,sortDirection:sortDirection,sortField:sortField}}).data
    } catch (e){
        throw new Error(e.response.data.message);
    }
}
export async function getOne(entity, id){
    try{
        return await request.get(link+entity+'/'+id).data;
    } catch (e){
        throw new Error(e.response.data.message);
    }
}
export async function updateOne(entity,id, data){
    try{
        return await request.put(link+entity+'/'+id, data).data;
    } catch (e){
        throw new Error(e.response.data.message);
    }
}
export async function createOne(entity, data){
    try{
        return await request.post(link+entity, data);
    } catch (e){
        throw new Error(e.response.data.message);
    }
}
export async function deleteOne(entity, id){
    try{
        return await request.delete(link+entity+'/'+id);
    } catch (e){
        throw new Error(e.response.data.message);
    }
}