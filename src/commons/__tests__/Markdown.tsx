import { Chapter, Variant } from 'js-slang/dist/types';

import { getLanguageConfig } from '../application/ApplicationTypes';
import Markdown from '../Markdown';
import { generateLanguageIntroduction } from '../utils/IntroductionHelper';
import { renderTreeJson } from '../utils/TestUtils';

const mockProps = (sourceChapter: Chapter, sourceVariant: Variant) => {
  return {
    content: generateLanguageIntroduction(getLanguageConfig(sourceChapter, sourceVariant)),
    openLinksInNewWindow: true
  };
};

test('Markdown page renders correctly', async () => {
  const app = <Markdown {...mockProps(Chapter.SOURCE_1, Variant.DEFAULT)} />;
  const tree = await renderTreeJson(app);
  expect(tree).toMatchSnapshot();
});

test('Markdown page renders correct Source information', () => {
  const source1Default = <Markdown {...mockProps(Chapter.SOURCE_1, Variant.DEFAULT)} />;
  expect(source1Default.props.content).toContain('Source \xa71');

  const source1Wasm = <Markdown {...mockProps(Chapter.SOURCE_1, Variant.WASM)} />;
  expect(source1Wasm.props.content).toContain('Source \xa71 WebAssembly');

  const source2Default = <Markdown {...mockProps(Chapter.SOURCE_2, Variant.DEFAULT)} />;
  expect(source2Default.props.content).toContain('Source \xa72');

  const source3Default = <Markdown {...mockProps(Chapter.SOURCE_3, Variant.DEFAULT)} />;
  expect(source3Default.props.content).toContain('Source \xa73');

  const source4Default = <Markdown {...mockProps(Chapter.SOURCE_4, Variant.DEFAULT)} />;
  expect(source4Default.props.content).toContain('Source \xa74');
});
