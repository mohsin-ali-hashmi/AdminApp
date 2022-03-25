import Repository from "./Repository";

const all_organizations  = "orgaizations";
export default {
    organizationModel(payload){
        return Repository.post(organization_resource , payload);
    },
}