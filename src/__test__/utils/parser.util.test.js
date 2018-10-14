import parse from '../../utils/parser.util';

describe('hgvs parser', () => {
  test('no number', () => {
    const result = parse('esp');
    expect(result).toEqual({'at': 3, 'error': 'Missing number', 'prefix': 'esp'});
  });

  test('number too short', () => {
    const result = parse('esp0000');
    expect(result).toEqual({'at': 3, 'error': 'Number length too short(4) should be at least 11 numbers', 'number': '0000', 'prefix': 'esp'});
  });

  test('number too long', () => {
    const result = parse('esp000000000000000');
    expect(result).toEqual({'at': 3, 'error': 'Number length too long(15) should be at most 11 numbers', 'number': '000000000000000', 'prefix': 'esp'});
  });

  test('no version or :p.', () => {
    const result = parse('esp00000000000');
    expect(result).toEqual({'at': 14, 'error': 'Missing "."(for version) or ":"(for type) after number', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000'});
  });

  test('no :p.', () => {
    const result = parse('esp00000000000.2');
    expect(result).toEqual({'at': 16, 'error': 'Missing ":" after version', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'version': '2'});
  });

  test('no p.', () => {
    const result = parse('esp00000000000.2:');
    expect(result).toEqual({'at': 17, 'error': 'Missing type should be "p."', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'version': '2'});
  });

  test('no . after :p', () => {
    const result = parse('esp00000000000.2:p');
    expect(result).toEqual({'at': 18, 'error': 'Missing "." after p', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'type': 'p', 'version': '2'});
  });

  test('no source amino acid', () => {
    const result = parse('esp00000000000.2:p.');
    expect(result).toEqual({'at': 19, 'error': 'Missing source amino acid symbol after "p."', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'type': 'p', 'version': '2'});
  });

  test('source amino acid invalid', () => {
    const result = parse('esp00000000000.2:p.ggg');
    expect(result).toEqual({'at': 19, 'error': 'Missing valid source amino acid symbol after "p." should be one of [Ala,Cys,Asp,Glu,Phe,Gly,His,Ile,Lys,Leu,Met,Asn,Pro,Gln,Arg,Ser,Thr,Val,Trp,X,Tyr]', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'type': 'p', 'version': '2'});
  });

  test('no index', () => {
    const result = parse('esp00000000000.2:p.glu');
    expect(result).toEqual({'at': 22, 'error': 'Missing position number after source amino acid', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'sourceAminoAcid': 'E', 'type': 'p', 'version': '2'});
  });

  test('no replacement amino acid', () => {
    const result = parse('esp00000000000.2:p.glu600');
    expect(result).toEqual({'aminoAcidIndex': 600, 'at': 25, 'error': 'Missing replacement amino acid after position index', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'sourceAminoAcid': 'E', 'type': 'p', 'version': '2'});
  });

  test('replacement amino acid wrong', () => {
    const result = parse('esp00000000000.2:p.glu600sss');
    expect(result).toEqual({'aminoAcidIndex': 600, 'at': 25, 'error': 'Missing valid replacement amino acid after position index should be one of [Ala,Cys,Asp,Glu,Phe,Gly,His,Ile,Lys,Leu,Met,Asn,Pro,Gln,Arg,Ser,Thr,Val,Trp,X,Tyr]', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'sourceAminoAcid': 'E', 'type': 'p', 'version': '2'});
  });

  test('all good', () => {
    const result = parse('esp00000000000.2:p.glu600val');
    expect(result).toEqual({'aminoAcidIndex': 600, 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'replacementAminoAcid': 'V', 'sourceAminoAcid': 'E', 'type': 'p', 'version': '2'});
  });

  test('extra characters at the end', () => {
    const result = parse('esp00000000000.2:p.glu600valfgsfg');
    expect(result).toEqual({'aminoAcidIndex': 600, 'at': 28, 'error': 'Invalid extra characters after replacement amino acid', 'number': '00000000000', 'prefix': 'esp', 'proteinId': 'esp00000000000.2', 'replacementAminoAcid': 'V', 'sourceAminoAcid': 'E', 'type': 'p', 'version': '2'});
  });
});
