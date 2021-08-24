import Branch from "./Branch";
import classes from "./BranchList.module.css";

const BranchList = (props) => {
    const branches = props.branches;

    let branchDOM = <p>Kriterlerinize uygun şube bulunamadı.</p>

    if (branches && branches.length > 0) {
        branchDOM =
            branches.map(branch => {
                return (
                    <Branch key={branch.code} item={branch}/>
                );
            })
    }

    return (
        <section className={`${classes["branch-list"]} ${props.className}`}>
            <ul>
                {branchDOM}
            </ul>
        </section>
    )
}

export default BranchList;
