export const getProjects = s => s.appReducer.projects
export const getHeroProjects = s => s.appReducer.projectsHero
export const getProject = (s, projectId) => {
  return s.appReducer.projects.get(projectId)
}
