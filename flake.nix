{
  description = "A dev environment for nodejs";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    nix-vscode-extensions.url = "github:nix-community/nix-vscode-extensions";
  };

  outputs = { self, nixpkgs, flake-utils, nix-vscode-extensions }: 
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        system = "${system}";
      };
    in {
      devShell = pkgs.mkShell {
        packages = with pkgs; [
          zsh

          nodePackages.nodejs
          nodePackages.nodemon
          nodePackages.ts-node
        ];

        shellHook = ''
          zsh
        '';
      };

      apps.default.type = "app";
      apps.default.program = "${pkgs.writeScript "TheBunnyBot-Run" ''
        ${pkgs.nodejs}/bin/node .
      ''}";
    }
  );
}
