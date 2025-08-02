"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, getAllprojects, projectsLoading, setprojects] = useAxiosGet([]);
    const [approvedProjects, getAllApprovedProjects, ApprovedProjectsLoading, setApprovedProjects] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all projectss whenever component mounts or reload changes
    useEffect(() => {
        getAllprojects(`http://localhost:3000/api/v1/projects/`);
        getAllApprovedProjects(`http://localhost:3000/api/v1/projects/approve`);
    }, [reload]);

    const ProjectContextValue = useMemo(
        () => ({ projects, setprojects, setReload, projectsLoading ,approvedProjects,ApprovedProjectsLoading}),
        [projects, projectsLoading,approvedProjects,ApprovedProjectsLoading]
    );

    return (
        <ProjectContext.Provider value={ProjectContextValue}>
            {children}
        </ProjectContext.Provider>
    );
};

const useProjectContext = () => {
    return useContext(ProjectContext);
};

export { ProjectProvider, useProjectContext };
