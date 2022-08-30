import styled from 'styled-components';

export const Container = styled.div`
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1067%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='rgba(245%2c 247%2c 251%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c622.816C113.997%2c604.775%2c214.805%2c546.766%2c305.564%2c475.467C389.785%2c409.304%2c450.516%2c323.228%2c501.352%2c228.96C555.357%2c128.816%2c607.057%2c26.168%2c609.205%2c-87.59C611.583%2c-213.55%2c587.327%2c-342.953%2c514.085%2c-445.457C437.43%2c-552.737%2c324.249%2c-637.206%2c195.66%2c-666.356C70.254%2c-694.785%2c-53.089%2c-637.205%2c-176.785%2c-602.073C-301.65%2c-566.608%2c-448.249%2c-560.116%2c-530.873%2c-460.004C-613.204%2c-360.247%2c-572.333%2c-212.43%2c-602.224%2c-86.587C-636.061%2c55.871%2c-765.109%2c189.267%2c-718.02%2c327.909C-671.217%2c465.709%2c-509.376%2c527.843%2c-374.757%2c583.134C-256.157%2c631.846%2c-126.638%2c642.858%2c0%2c622.816' fill='%238ba2d1'%3e%3c/path%3e%3cpath d='M1920 1719.154C2045.081 1722.97 2166.193 1692.874 2278.825 1638.342 2402.942 1578.25 2528.018 1508.266 2599.342 1390.245 2674.663 1265.6100000000001 2703.66 1114.451 2682.503 970.369 2661.378 826.508 2590.802 689.547 2482.245 592.812 2379.867 501.58299999999997 2230.88 505.70000000000005 2103.648 454.552 1958.683 396.275 1838.273 258.591 1682.5529999999999 271.331 1520.644 284.578 1381.077 398.087 1276.313 522.242 1172.3229999999999 645.48 1100.521 800.8109999999999 1099.704 962.059 1098.931 1114.581 1182.396 1252.5 1271.988 1375.937 1349.35 1482.5230000000001 1458.589 1555.2269999999999 1574.974 1616.87 1683.171 1674.176 1797.621 1715.421 1920 1719.154' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1067'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Title = styled.h1`
  font-family: 'Karla', sans-serif;
  font-weight: 700;
  color: #293264;
  font-size: 5rem;
  margin: 2rem;
`;

export const Load = styled.h2`
  font-family: 'Karla', sans-serif;
  font-weight: 400;
  color: #293264;
  margin: 2rem;
  font-size: 3rem;
`;

export const InputField = styled.label`
  display: ${(props) => props.disp || 'inline'};
  font-family: 'Karla', sans-serif;
  font-size: 2.5rem;
  color: #293264;
  margin: 1rem 0;
`;

export const InputNumber = styled.input`
  font-family: 'Karla', sans-serif;
  background-color: #293264;
  -moz-appearance: textfield;
  box-sizing: border-box;
  padding: 0.5rem 1.5rem;
  border-radius: 7px;
  color: #f5f7fb;
  font-size: 2rem;
  margin: 1rem 0;
  display: block;
  border: none;
  width: 100%;
`;

export const List = styled.select`
  font-family: 'Karla', sans-serif;
  background-color: #293264;
  padding: 0.5rem 1.5rem;
  box-sizing: border-box;
  border-radius: 7px;
  color: #f5f7fb;
  font-size: 2rem;
  display: block;
  margin: 1rem 0;
  border: none;
  width: 100%;
`;

export const InputRadio = styled.input`
  margin-left: 1rem;
`;

export const ContainerButton = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

export const Button = styled.button`
  font-family: 'Karla', sans-serif;
  background-color: #4D5B9E;
  border-radius: 1rem;
  font-size: 1.8rem;
  color: #f5f7fb;
  border: none;
  width: 20rem;
  height: 5rem;
  margin: auto;
`;

export const LinkStyle = {
  textDecoration: 'none',
};
