/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddUserRequest {
  /** @format uuid */
  groupId?: string;
  /** @format uuid */
  userid?: string;
}

export interface CreateGroupRequest {
  groupname?: string | null;
}

export interface CreateUserRequest {
  name?: string | null;
  surname?: string | null;
  ntUser?: string | null;
  email?: string | null;
  password?: string | null;
  repeatPassword?: string | null;
}

export interface GetMessagesReponse {
  target: Target;
  messages: MessageDTO[];
}

export interface GroupchatDTO {
  /** @format uuid */
  id?: string;
  name?: string | null;
  /** @format date-time */
  createdDate?: string;
  users?: UserDTOShort[] | null;
}

export interface GroupchatDTOShort {
  /** @format uuid */
  id?: string;
  name?: string | null;
  /** @format date-time */
  createdDate?: string;
}

export interface LoginUserRequest {
  email?: string | null;
  password?: string | null;
}

export interface MessageDTO {
  /** @format uuid */
  id: string;
  sender?: UserDTOShort;
  groupReciever?: GroupchatDTOShort;
  userReciever?: UserDTOShort;
  /** @minLength 1 */
  content: string;
  /** @format date-time */
  createdDate: string;
}

export interface MessageResponse {
  action?: string | null;
  sender?: UserDTO;
  userReciever?: UserDTO;
  groupReciever?: GroupchatDTO;
  message?: MessageDTO;
  /** @format date-time */
  createdDate?: string;
}

export interface SendMessageRequest {
  /** @format uuid */
  senderID?: string;
  /** @format uuid */
  receiverID?: string;
  content?: string | null;
}

export interface Target {
  /** @format uuid */
  id: string;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  type: string;
}

export interface UserDTO {
  /** @format uuid */
  id?: string;
  name?: string | null;
  surname?: string | null;
  displayName?: string | null;
  ntUser?: string | null;
  email?: string | null;
  /** @format date-time */
  createdAt?: string;
  avatar?: string | null;
  userGroupchats?: GroupchatDTOShort[] | null;
}

export interface UserDTOShort {
  /** @format uuid */
  id?: string;
  displayName?: string | null;
  ntUser?: string | null;
  avatar?: string | null;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title ChatSysBackend
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name RegisterCreate
   * @request POST:/register
   */
  registerCreate = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Auth
   * @name LoginCreate
   * @request POST:/login
   */
  loginCreate = (data: LoginUserRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Group
   * @name GroupList
   * @request GET:/api/Group
   */
  groupList = (params: RequestParams = {}) =>
    this.request<GroupchatDTO[], any>({
      path: `/api/Group`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Group
   * @name GroupCreate
   * @request POST:/api/Group
   */
  groupCreate = (data: CreateGroupRequest, params: RequestParams = {}) =>
    this.request<GroupchatDTO, any>({
      path: `/api/Group`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Message
   * @name MessageList
   * @request GET:/Message
   */
  messageList = (
    query?: {
      /** @format uuid */
      target?: string;
      /**
       * @format int32
       * @default 20
       */
      count?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMessagesReponse, any>({
      path: `/Message`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Message
   * @name SendCreate
   * @request POST:/Send
   */
  sendCreate = (data: SendMessageRequest, params: RequestParams = {}) =>
    this.request<MessageResponse, any>({
      path: `/Send`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags User
   * @name UserList
   * @request GET:/api/User
   */
  userList = (params: RequestParams = {}) =>
    this.request<UserDTO[], any>({
      path: `/api/User`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags User
   * @name UserCreate
   * @request POST:/api/User
   */
  userCreate = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/User`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name V1AuthMeList
     * @request GET:/api/v1/Auth/@me
     */
    v1AuthMeList: (params: RequestParams = {}) =>
      this.request<UserDTO, any>({
        path: `/api/v1/Auth/@me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name V1AuthSigninDetail
     * @request GET:/api/v1/Auth/signin/{providerName}
     */
    v1AuthSigninDetail: (
      providerName: string,
      query?: {
        returnUrl?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/Auth/signin/${providerName}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name V1AuthSignoutList
     * @request GET:/api/v1/Auth/signout
     */
    v1AuthSignoutList: (
      query?: {
        returnUrl?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/Auth/signout`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name V1AuthExternalCallbackList
     * @request GET:/api/v1/Auth/external/callback
     */
    v1AuthExternalCallbackList: (
      query?: {
        returnUrl?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/Auth/external/callback`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  myGroups = {
    /**
     * No description
     *
     * @tags Group
     * @name GroupMyGroupsList
     * @request GET:/api/Group/MyGroups
     */
    groupMyGroupsList: (params: RequestParams = {}) =>
      this.request<GroupchatDTO[], any>({
        path: `/api/Group/MyGroups`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  id = {
    /**
     * No description
     *
     * @tags Group
     * @name GroupDetail
     * @request GET:/api/Group/{id}
     */
    groupDetail: (id: string, params: RequestParams = {}) =>
      this.request<GroupchatDTO, any>({
        path: `/api/Group/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDetail
     * @request GET:/api/User/{id}
     */
    userDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/User/${id}`,
        method: "GET",
        ...params,
      }),
  };
  addUser = {
    /**
     * No description
     *
     * @tags Group
     * @name GroupAddUserCreate
     * @request POST:/api/Group/addUser
     */
    groupAddUserCreate: (data: AddUserRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Group/addUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  removeUser = {
    /**
     * No description
     *
     * @tags Group
     * @name GroupRemoveUserDelete
     * @request DELETE:/api/Group/removeUser
     */
    groupRemoveUserDelete: (data: AddUserRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Group/removeUser`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
