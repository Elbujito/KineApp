package com.auth.model.provider.roles;


import java.util.Set;
import com.auth.model.AuthException;
import com.auth.model.user.User;


public interface IAuthRolesProvider {

    Set<String> getRoles(User user) throws AuthException;

}
