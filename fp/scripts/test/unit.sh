cd ./tests/unit
checkfile=`ls | grep ".spec.ts" | tr -s "\n" " "`
jest --findRelatedTests $checkfile --collectCoverage --reporters default jest-stare 
# jest --findRelatedTests $checkfile --collectCoverage --reporters default jest-stare 
rm -rf ../../docs/jest-stare
mv -f ./docs/jest-stare ../../docs
rm -rf ./docs