import { useRoleContext } from "../context/RoleContext"


const DashboardUser = () => {
    const {userInfo} = useRoleContext();
  return (
    <div>
        <p>Hello Mister {userInfo.userId}</p>
        <p>Roles: {userInfo.userRoles.map(role => `${role} |`)}</p>
    </div>
  )
}

export default DashboardUser
