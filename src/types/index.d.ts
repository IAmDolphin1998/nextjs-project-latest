declare global {
  type ImageProps = {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };

  type AreaProps = {
    Name: string;
  };

  type TagProps = {
    Name: string;
  };

  type AuthorProps = {
    FirstName: string;
    LastName: string;
    Email: string;
    Description: string;
    Avatar?: ImageProps;
  };

  type DocumentProps = {
    Title: string;
    Content: string;
    Area: AreaProps;
    Tags: TagProps[];
    Authors: AuthorProps[];
    Thumbnail: ImageProps;
    Date?: string;
  };
}

export {};
