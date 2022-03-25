import ViewAllOrganizations from "./ViewAllOrganizations";

const repositories ={
    viewAllOrganizations_repository : ViewAllOrganizations
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
}