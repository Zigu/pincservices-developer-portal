import {PermissionPolicy, PolicyQuery} from "@backstage/plugin-permission-node";
import {AuthorizeResult, isPermission, PolicyDecision} from "@backstage/plugin-permission-common";
import {BackstageIdentityResponse} from "@backstage/plugin-auth-node";
import {
  catalogEntityDeletePermission,
  catalogEntityCreatePermission,
  catalogEntityRefreshPermission
} from '@backstage/plugin-catalog-common/alpha';
import {catalogConditions, createCatalogConditionalDecision} from "@backstage/plugin-catalog-backend/alpha";
import {DefaultPlaylistPermissionPolicy, isPlaylistPermission} from '@backstage/plugin-playlist-backend';

export class GlobalPermissionPolicy implements PermissionPolicy {

  private playlistPermissionPolicy = new DefaultPlaylistPermissionPolicy();

  async handle(request: PolicyQuery, user?: BackstageIdentityResponse): Promise<PolicyDecision> {

    const isGuest = user === undefined;

    if (isGuest) {
      if (isPermission(request.permission, catalogEntityCreatePermission)) {
        return {
          result: AuthorizeResult.DENY
        }
      }
      /*

      Comment this block because of https://github.com/backstage/backstage/issues/19356 ... techdocs are not sending user information properly. Therefore, the requests are treated like a guest access.
      Source of the issue is the AuthorizedEntitiesCatalog
      if (isPermission(request.permission, catalogEntityReadPermission)) {
          return {
              result: AuthorizeResult.DENY
          }
      }

       */
      if (isPermission(request.permission, catalogEntityDeletePermission)) {
        return {
          result: AuthorizeResult.DENY
        }
      }

      if (isPermission(request.permission, catalogEntityRefreshPermission)) {
        return {
          result: AuthorizeResult.DENY
        }
      }
    }

    if (isPlaylistPermission(request.permission)) {
      return this.playlistPermissionPolicy.handle(request, user);
    }

    if (isPermission(request.permission, catalogEntityDeletePermission)) {
      return createCatalogConditionalDecision(
        request.permission,
        {
          anyOf: [
            catalogConditions.isEntityOwner({claims: user?.identity.ownershipEntityRefs ?? [],}),
            catalogConditions.isEntityKind({kinds: ["Location"]})
          ]
        }
      );
    }
    return {result: AuthorizeResult.ALLOW};
  }
}
