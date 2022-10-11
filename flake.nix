{ # inputs = { nixpkgs.url = "github:nixos/nixpkgs"; };
  nixConfig = {
    bash-prompt-suffix = "[dev] ";
  };
  inputs = {
    nixpacks = {
      url = "github:railwayapp/nixpacks";
      flake = true;
    };
    easyPSSrc = {
      flake = false;
      url = "github:justinwoo/easy-purescript-nix";
    };
  };

  outputs = { self, nixpkgs, nixpacks, easyPSSrc }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      easyPS = pkgs.callPackage easyPSSrc { inherit pkgs; };
    in {
      devShell.x86_64-linux =
        pkgs.mkShell {
          buildInputs = [
            nixpacks.packages.x86_64-linux.nixpacks

            easyPS."purs-0_15_2"
            easyPS.purescript-language-server
            easyPS.pscid
            easyPS.purs-tidy
            easyPS.pulp
            easyPS.zephyr
            easyPS.spago

            pkgs.jq
            pkgs.docker
            pkgs.nodePackages.bower
            pkgs.nodePackages.jshint
            pkgs.nodePackages.nodemon
            pkgs.nodePackages.yarn
            pkgs.nodePackages.webpack
            pkgs.nodePackages.webpack-cli
            pkgs.nodePackages.webpack-dev-server
            pkgs.dhall
            pkgs.nodejs
            pkgs.pkgconfig
            pkgs.postgresql
            pkgs.python27
            pkgs.python37
            pkgs.unzip
        ];
      };
    };
}
